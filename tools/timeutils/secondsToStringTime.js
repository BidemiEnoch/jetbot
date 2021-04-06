module.exports = (duration) => {
       const d = Math.floor(duration / 86400);
       const h = Math.floor((duration - d * 86400) / 3600);
       const m = Math.floor((duration - d * 86400 - h * 3600) / 60);
       const s = Math.floor(duration - d * 86400 - h * 3600 - m * 60);
       const days = filter(d, 'day');
       const hours = filter(h, 'hour');
       const mins = filter(m, 'minute');
       const secs = filter(s, 'second');
       return `${days}${hours}${mins}${secs}`;
};

const filter = (val, unit) => {
       if (val === 0) return '';
       if (val === 1) return `${val}${unit} `;
       else return `${val}${unit}s `;
};
