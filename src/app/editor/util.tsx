import styles from './page.module.css'
import InputField from './InputField';

export interface inputBlockInterface {
    type: string,
    content: string
}

export const inputObjsToJSX = (objects: inputBlockInterface[]) : React.JSX.Element => {
    const inputFieldList : React.ReactElement[] = objects.map((e : inputBlockInterface, index : number) => {
            const key : string = `${index}-${e.type}`;

            return (
                <InputField type={e.type} content={e.content} key={key} />
            )
        }
    );
    
    return (
        <div className={styles['editor-window']}>
            {inputFieldList}
        </div>
    )
}