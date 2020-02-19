import React, {useState, useEffect} from "react";

const NewClient = () => {
    const [name, setName] = useState('')

    return (
        <div>
            <h1>Add Clients</h1>
            <form> 
                <table> 
                    <tr> 
                        <td>Name:</td>
                        <td>
                            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
                        </td>
                    </tr>
                </table>
            </form>
            
        </div>
    );
};

export default NewClient;