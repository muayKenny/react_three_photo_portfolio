import classNames from 'classnames';
import { Html } from '@react-three/drei';
import styles from './Viewfinder.module.css';

const Viewfinder = () => {
  return (
    <Html
      as='div' // Wrapping element (default: 'div')
      center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
      style={{ pointerEvents: 'none' }}
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
        ></div>
        <div
          className={classNames(
            styles['overlay-element'],
            styles['bottom-right']
          )}
        ></div>
      </div>
    </Html>
  );
};

export default Viewfinder;
