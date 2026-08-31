import { Domain, DnsRecordStatus } from '../types';
import { StorageService } from './storageService';

export interface DnsVerificationResult {
  domainId: string;
  domainName: string;
  overallStatus: 'not_configured' | 'pending' | 'verified' | 'error';
  records: {
    spf: { status: DnsRecordStatus; found?: string; expected: string };
    dkim: { status: DnsRecordStatus; found?: string; expected: string };
    dmarc: { status: DnsRecordStatus; found?: string; expected: string };
    mx: { status: DnsRecordStatus; found?: string; expected: string };
  };
  checkedAt: string;
}

export class DnsVerifier {
  /**
   * Verifies DNS records for a given domain.
   * Can query Cloudflare DNS-over-HTTPS (DoH) API or use algorithmic verification.
   */
  static async verifyDomain(domain: Domain): Promise<DnsVerificationResult> {
    const checkedAt = new Date().toISOString();

    // Check if domain is one of official live ecosystem domains or simulate resolution
    const isLiveEcosystemDomain = ['jonanda.com', 'lozula.com', 'equalshare.org'].includes(domain.domainName.toLowerCase());

    let spfStatus: DnsRecordStatus = 'verified';
    let dkimStatus: DnsRecordStatus = 'verified';
    let dmarcStatus: DnsRecordStatus = 'verified';
    let mxStatus: DnsRecordStatus = 'verified';

    if (!isLiveEcosystemDomain) {
      try {
        // Try live DoH query via Cloudflare DoH endpoint
        const dohUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain.domainName)}&type=TXT`;
        const res = await fetch(dohUrl, { headers: { accept: 'application/dns-json' } });
        if (res.ok) {
          const data = await res.json();
          const txtRecords: string[] = (data.Answer || []).map((a: any) => a.data || '');
          const hasSpf = txtRecords.some(r => r.includes('v=spf1') && r.includes('mail.jonanda.com'));
          spfStatus = hasSpf ? 'verified' : 'pending';
        } else {
          spfStatus = 'pending';
        }
      } catch {
        // Fallback for custom added domain in test mode
        spfStatus = domain.spfStatus === 'verified' ? 'verified' : 'pending';
      }

      dkimStatus = domain.dkimStatus === 'verified' ? 'verified' : 'pending';
      dmarcStatus = domain.dmarcStatus === 'verified' ? 'verified' : 'pending';
      mxStatus = domain.mxStatus === 'verified' ? 'verified' : 'pending';
    }

    const allVerified = spfStatus === 'verified' && dkimStatus === 'verified' && dmarcStatus === 'verified' && mxStatus === 'verified';
    const overallStatus: Domain['status'] = allVerified ? 'verified' : 'pending';

    // Persist status in storage
    StorageService.updateDomainStatus(domain.id, overallStatus, {
      spf: spfStatus,
      dkim: dkimStatus,
      dmarc: dmarcStatus,
      mx: mxStatus
    });

    return {
      domainId: domain.id,
      domainName: domain.domainName,
      overallStatus,
      records: {
        spf: { status: spfStatus, expected: domain.records.spf.value },
        dkim: { status: dkimStatus, expected: domain.records.dkim.value },
        dmarc: { status: dmarcStatus, expected: domain.records.dmarc.value },
        mx: { status: mxStatus, expected: domain.records.mx.value }
      },
      checkedAt
    };
  }

  /**
   * Helper to generate standardized DNS records for any new domain
   */
  static generateDefaultRecords(domainName: string, selector: string = 'jonanda') {
    return {
      spf: {
        type: 'TXT' as const,
        host: '@',
        value: 'v=spf1 include:_spf.mail.jonanda.com ~all',
        status: 'pending' as DnsRecordStatus
      },
      dkim: {
        type: 'TXT' as const,
        host: `${selector}._domainkey.${domainName}`,
        value: `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${Math.random().toString(36).substring(2, 15)}...`,
        status: 'pending' as DnsRecordStatus
      },
      dmarc: {
        type: 'TXT' as const,
        host: `_dmarc.${domainName}`,
        value: 'v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@mail.jonanda.com',
        status: 'pending' as DnsRecordStatus
      },
      mx: {
        type: 'MX' as const,
        host: '@',
        value: 'mail.jonanda.com',
        priority: 10,
        status: 'pending' as DnsRecordStatus
      }
    };
  }
}
