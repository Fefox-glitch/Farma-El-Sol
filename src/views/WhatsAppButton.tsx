export const WhatsAppButton = () => {
  const href = 'https://wa.me/56975564584';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp Farmacias El Sol"
      className="fixed bottom-6 right-6 z-50 bg-brand-accent text-white px-4 py-3 rounded-full shadow-lg hover:opacity-90"
    >
      💬 WhatsApp
    </a>
  );
};