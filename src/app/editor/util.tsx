import styles from './page.module.css'
import InputField from './InputField';
import { DocumentData } from '@firebase/firestore';

export interface inputBlockInterface {
    type: string,
    content: string
}

export const inputObjsToJSX = (objects: inputBlockInterface[], updateParentFunc: (index: number, content: string) => void) : React.JSX.Element => {
    const inputFieldList : React.ReactElement[] = objects.map((e : inputBlockInterface, index : number) => {
            const key : string = `${index}`;

            return (
                <InputField type={e.type} content={e.content} index={index} updateFormState={updateParentFunc} key={key} />
            )
        }
    );
    
    return (
        <div className={styles['editor-window']}>
            {inputFieldList}
        </div>
    )
}

export const reconstructFromDB = (obj : DocumentData | null) : inputBlockInterface[] => {
    const newState : inputBlockInterface[] = [];

    for(const entry in obj){
        const component : inputBlockInterface = obj[entry];
        newState.push(component);
    }
    
    return newState;
}