import { Link } from 'react-router-dom';
import './styles.css';

export const DashboardCard = ({ title, img, description, link }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      {img}
      <p>{description}</p>
      <Link to={link}>zobacz więcej {`>`} </Link>
    </div>
  );
};
