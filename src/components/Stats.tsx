import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target } from 'lucide-react';

interface StatsProps {
    wpm: number;
    accuracy: number;
}

const Stats: React.FC<StatsProps> = ({ wpm, accuracy }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <StatCard
                icon={<Zap size={20} color="var(--primary-color)" />}
                label="Words Per Minute"
                value={wpm}
                suffix="WPM"
            />
            <StatCard
                icon={<Target size={20} color="var(--secondary-color)" />}
                label="Accuracy"
                value={accuracy}
                suffix="%"
            />
        </div>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, suffix }) => (
    <motion.div
        className="glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            borderLeft: `4px solid ${suffix === 'WPM' ? 'var(--primary-color)' : 'var(--secondary-color)'}`,
        }}
    >
        <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)' }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {value} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{suffix}</span>
            </div>
        </div>
    </motion.div>
);

export default Stats;
