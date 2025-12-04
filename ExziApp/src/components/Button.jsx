import styles from './stylesheets/Button.module.css';

const Button = (props) => {
    return(
        <button className={styles.btn} onClick={props.onClick}>
            <span className={styles.btn_text}>
                {props.text}
            </span>
        </button>
    )
}

export default Button
