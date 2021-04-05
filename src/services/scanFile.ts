import NodeClam from 'clamscan'

// clamscan module configs
const ClamScan = new NodeClam().init({
    remove_infected: true, // Removes files if they are infected
    quarantine_infected: '~/infected/', // Move file here. remove_infected must be FALSE, though.
    scan_log: '/var/log/node-clam', // You're a detail-oriented security professional.
    // debug_mode: true, // This will put some debug info in your js console
    // file_list: '/home/webuser/scan_files.txt', // path to file containing list of files to scan
    scan_recursively: false, // Choosing false here will save some CPU cycles
    clamscan: {
        path: '/usr/bin/clam', // I dunno, maybe your clamscan is just call "clam"
        scan_archives: false, // Choosing false here will save some CPU cycles
        // db: '/usr/bin/better_clam_db', // Path to a custom virus definition database
        active: false // you don't want to use this at all because it's evil
    },
    clamdscan: {
        socket: null, // This is pretty typical
        host: 'clamAV', // If you want to connect locally but not through socket
        port: 3310, // Because, why not
        timeout: 300000, // 5 minutes
        local_fallback: true, // Use local preferred binary to scan if socket/tcp fails
        // path: '/bin/clamdscan', // Special path to the clamdscan binary on your server
        // config_file: '/etc/clamd.d/daemon.conf', // A fairly typical config location
        // multiscan: false, // You hate speed and multi-threaded awesome-sauce
        // reload_db: true, // You want your scans to run slow like with clamscan
        // active: false, // you don't want to use this at all because it's evil
        // bypass_test: true, // Don't check to see if socket is available. You should probably never set this to true.
    },
    preference: 'clamscan' // If clamscan is found and active, it will be used by default
});

// Scan file using clamscan module
export function scanFile(filePath) {
  return ClamScan.then(async clamscan => {
    const { is_infected, viruses } = await clamscan.scan_file(filePath);

    if (is_infected) {
      console.log(`The file is INFECTED with ${viruses}`);
      return true
      throw new Error('ERR_FILE_SCAN_INFECTED');
    }


  }).catch(err => {
    throw new Error(err);
  });
}
