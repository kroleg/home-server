import { Tail } from 'tail';

const LOG_FILE = '/var/log/dnsmasq.log';
const dnsmasqRegex = /reply ([\w\.\-]+) is ([\d\.]+)/;

// In-memory store to temporarily group IPs per domain
const domainCache: Record<string, { ips: Set<string>; timer: NodeJS.Timeout }> = {};

const tail = new Tail(LOG_FILE);

tail.on('line', (line: string) => {
    const match = dnsmasqRegex.exec(line);
    if (match) {
        const domain = match[1];
        const ip = match[2];

        if (!domainCache[domain]) {
            domainCache[domain] = {
                ips: new Set(),
                timer: setTimeout(() => {
                    // Flush after 500ms
                    flushDomain(domain);
                }, 500),
            };
        }

        domainCache[domain].ips.add(ip);
    }
});

tail.on('error', (err: Error) => {
    console.error('Error watching log file:', err);
});

function flushDomain(domain: string) {
    const entry = domainCache[domain];
    if (entry) {
        const ipList = Array.from(entry.ips);
        console.log(`Resolved: ${domain} -> ${ipList.join(', ')}`);

        // TODO: Save to DB or further processing

        delete domainCache[domain]; // Clear from cache
    }
}
