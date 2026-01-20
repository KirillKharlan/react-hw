import style from "./searchfield.module.css";
import { usePostContext } from "../../context/PostsContext"; 

export function InputSearch() {
    const { inputData, setInputData } = usePostContext();

    return (
        <div className={style.sfContainer}>
            <div className={style.searchField}>
                <input
                    className={style.inputSearch}
                    type="text"
                    placeholder="Posts search..."
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />
            </div>
        </div>
    );
}