import classNames from 'classnames';
import { Html } from '@react-three/drei';
import styles from './Viewfinder.module.css';

const Viewfinder = () => {
  return (
    <Html
      as='div' // Wrapping element (default: 'div')
      center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
    >
      <div className={styles.overlay}>
        <div
          className={classNames(styles['overlay-element'], styles['top-left'])}
        ></div>
        <div
          className={classNames(styles['overlay-element'], styles['top-right'])}
        ></div>
        <div
          className={classNames(
            styles['overlay-element'],
            styles['bottom-left']
          )}
        >
          <h1>MF</h1>
        </div>
        <div
          className={classNames(
            styles['overlay-element'],
            styles['bottom-right']
          )}
        >
          <h3>100 ISO</h3>
        </div>
      </div>
    </Html>
  );
};

export default Viewfinder;
