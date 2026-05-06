import classNames from 'classnames';
import { Card, CardBody } from 'reactstrap';

export default function StatCard({ label, value, delta, deltaDirection, icon, hint }) {
  return (
    <Card className="h-100">
      <CardBody className="stat-card">
        <div>
          <p className="stat-card__label">{label}</p>
          <p className="stat-card__value">{value}</p>
          {(delta || hint) && (
            <p className="stat-card__delta">
              {delta && (
                <span className={classNames('delta', deltaDirection)}>
                  <i
                    className={classNames(
                      'fa-solid me-1',
                      deltaDirection === 'up' ? 'fa-arrow-up' : 'fa-arrow-down',
                    )}
                  />
                  {delta}
                </span>
              )}
              {hint && <span>{hint}</span>}
            </p>
          )}
        </div>
        <div className="stat-card__icon" aria-hidden="true">
          <i className={`fa-solid ${icon}`} />
        </div>
      </CardBody>
    </Card>
  );
}
