import { PiSmileySadThin } from "react-icons/pi";
import css from './ErrorMessage.module.css'

export default function ErrorMessage() {
    return(
        <div>
            <h2 className={css.errorMsg}>Something went wrong  <PiSmileySadThin className={css.errorIcon} /></h2>
        </div>
    )
}