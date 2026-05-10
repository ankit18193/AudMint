import { Pool } from 'pg';
import dotenv from 'dotenv';
import { fileDb } from './fileStore';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
let isPostgresConnected = false;

export const pool = new Pool({
  connectionString: dbUrl || 'postgres://localhost:5432/postgres',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 2000, // Faster timeout for local dev
});

// Attempt connection but don't crash if it fails
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connected successfully.');
    isPostgresConnected = true;
    client.release();
  })
  .catch(err => {
    console.warn('⚠️ Database Connection Failed:', err.message);
    console.log('🔄 PERSISTENCE FALLBACK: Using persistent local storage (data/db.json).');
    console.log('Ensure your PostgreSQL server is running for production-grade SQL features.');
  });

// Unified persistence helper (PostgreSQL with File Fallback)
export const persistence = {
  saveAudit: async (audit: any) => {
    if (isPostgresConnected) {
      await pool.query(
        `INSERT INTO audits (
          id, tools, total_monthly_savings, total_annual_savings, recommendations, ai_summary,
          global_insight_title, global_insight_description, global_insight_savings
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          audit.id,
          JSON.stringify(audit.tools),
          audit.totalSavingsMonthly,
          audit.totalSavingsYearly,
          JSON.stringify(audit.recommendations),
          audit.aiSummary,
          audit.globalInsight?.title || null,
          audit.globalInsight?.description || null,
          audit.globalInsight?.savingsYearly || null
        ]
      );
    } else {
      fileDb.save('audits', audit.id, audit);
    }
  },
  getAudit: async (id: string) => {
    if (isPostgresConnected) {
      try {
        const res = await pool.query('SELECT * FROM audits WHERE id = $1', [id]);
        if (res.rows.length === 0) return null;
        const row = res.rows[0];
        return {
          id: row.id,
          tools: typeof row.tools === 'string' ? JSON.parse(row.tools) : row.tools,
          totalSavingsMonthly: parseFloat(row.total_monthly_savings),
          totalSavingsYearly: parseFloat(row.total_annual_savings),
          recommendations: typeof row.recommendations === 'string' ? JSON.parse(row.recommendations) : row.recommendations,
          aiSummary: row.ai_summary,
          globalInsight: row.global_insight_title ? {
            title: row.global_insight_title,
            description: row.global_insight_description,
            savingsYearly: parseFloat(row.global_insight_savings)
          } : undefined,
          createdAt: row.created_at
        };
      } catch (e) {
        return fileDb.get('audits', id);
      }
    } else {
      return fileDb.get('audits', id);
    }
  },
  saveLead: async (lead: any) => {
    if (isPostgresConnected) {
      await pool.query(
        'INSERT INTO leads (id, email, company, role, team_size, audit_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [lead.id, lead.email, lead.company || null, lead.role || null, lead.teamSize || null, lead.auditId]
      );
    } else {
      fileDb.save('leads', lead.id, { ...lead, audit_id: lead.auditId });
    }
  },
  findLead: async (email: string, auditId: string) => {
    if (isPostgresConnected) {
      try {
        const res = await pool.query('SELECT id FROM leads WHERE email = $1 AND audit_id = $2', [email, auditId]);
        return res.rows.length > 0;
      } catch (e) {
        return !!fileDb.findLead(email, auditId);
      }
    } else {
      return !!fileDb.findLead(email, auditId);
    }
  },
  checkAuditExists: async (id: string) => {
    if (isPostgresConnected) {
      try {
        const res = await pool.query('SELECT id FROM audits WHERE id = $1', [id]);
        return res.rows.length > 0;
      } catch (e) {
        return !!fileDb.get('audits', id);
      }
    } else {
      return !!fileDb.get('audits', id);
    }
  },
  saveSubscription: async (sub: any) => {
    if (isPostgresConnected) {
      await pool.query(
        'INSERT INTO subscriptions (id, email) VALUES ($1, $2)',
        [sub.id, sub.email]
      );
    } else {
      fileDb.save('subscriptions', sub.id, sub);
    }
  },
  findSubscriptionByEmail: async (email: string) => {
    if (isPostgresConnected) {
      try {
        const res = await pool.query('SELECT id FROM subscriptions WHERE email = $1', [email]);
        return res.rows.length > 0;
      } catch (e) {
        return !!fileDb.findSubscriptionByEmail(email);
      }
    } else {
      return !!fileDb.findSubscriptionByEmail(email);
    }
  }
};
