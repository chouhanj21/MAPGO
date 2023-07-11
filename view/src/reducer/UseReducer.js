
export const initialState= null;

export const reducer = (state, action) =>{
    if(action.type === "USER" || action.type ==="HOST"){
        return action.payload;
    }
    console.log(state);
    return state;

} 