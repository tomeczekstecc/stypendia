import NodeClam from 'clamscan';

// clamscan module configs
const ClamScan = new NodeClam().init({
  clamdscan: {
    socket: '/var/run/clamav/clamd.sock',
    host: '127.0.0.1',
    port: 3310,
  },
});

// Scan file using clamscan module
export function scanFile(filePath) {
  return ClamScan.then(async (clamscan) => {
    const { is_infected, viruses } = await clamscan.scan_file(filePath);

    if (is_infected) {
      console.log(`The file is INFECTED with ${viruses}`);
      throw new Error('ERR_FILE_SCAN_INFECTED');
    } else {
      return 'CLEAN';
    }
  }).catch((err) => {
    throw new Error(err);
  });
}
