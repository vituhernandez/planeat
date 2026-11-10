import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/">planeat<span>.</span></Link>
      <p>Planejar melhor é cuidar do que importa.</p>
      <span className="footer-ods">ODS 2 <i>·</i> ODS 11</span>
    </footer>
  );
}
