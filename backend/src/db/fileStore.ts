import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(__dirname, '../../data/db.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ audits: {}, leads: {}, subscriptions: {} }));
} else {
  // Ensure subscriptions key exists
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  if (!data.subscriptions) {
    data.subscriptions = {};
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
}

export const fileDb = {
  get: (table: 'audits' | 'leads' | 'subscriptions', id: string) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    return data[table][id];
  },
  save: (table: 'audits' | 'leads' | 'subscriptions', id: string, record: any) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    data[table][id] = { ...record, created_at: new Date().toISOString() };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  },
  findLead: (email: string, auditId: string) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    return Object.values(data.leads).find((l: any) => l.email === email && (l.auditId === auditId || l.audit_id === auditId));
  },
  findSubscriptionByEmail: (email: string) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    return Object.values(data.subscriptions).find((s: any) => s.email === email);
  }
};
