function Footer({ className, text }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-gray-200 py-4 text-center">
      <p className="text-xs text-gray-500">
        © {currentYear} AskaNote. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
