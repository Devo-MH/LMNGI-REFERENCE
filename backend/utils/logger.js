const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getLogFile = () => {
  const date = new Date().toISOString().split('T')[0];
  return path.join(logDir, `app-${date}.log`);
};

const formatLog = (level, message, meta = {}) => {
  return {
    level,
    timestamp: new Date().toISOString(),
    message,
    ...meta
  };
};

const writeLog = (logData) => {
  const logFile = getLogFile();
  const logLine = JSON.stringify(logData) + '\n';
  
  try {
    fs.appendFileSync(logFile, logLine);
  } catch (err) {
    console.error('Failed to write to log file:', err);
  }
};

const logger = {
  info: (message, meta = {}) => {
    const log = formatLog('INFO', message, meta);
    console.log(JSON.stringify(log));
    writeLog(log);
  },
  
  error: (message, meta = {}) => {
    const log = formatLog('ERROR', message, {
      stack: meta.stack || meta.err?.stack || meta.error?.stack,
      ...meta
    });
    console.error(JSON.stringify(log));
    writeLog(log);
  },
  
  warn: (message, meta = {}) => {
    const log = formatLog('WARN', message, meta);
    console.warn(JSON.stringify(log));
    writeLog(log);
  },
  
  debug: (message, meta = {}) => {
    const log = formatLog('DEBUG', message, meta);
    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify(log));
      writeLog(log);
    }
  }
};

module.exports = logger;

