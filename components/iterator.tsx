import { useIterator } from "./hooks/useIterator";
import { useEffect } from "react";

function iterator() {
    const [userList, current, isLoading, previous, next] = useIterator("https://randomuser.me/api/");

    if (userList.length !== 0) {
        console.log(`👷 userList: ${JSON.stringify(userList[0].name)}`);
    }
    // console.log(`👷 current: ${JSON.stringify(current)}`);
    // console.log(isLoading);

    return (
        <>
            <div>
                {isLoading ? <div>Loading...</div> : <div>{current.name}</div>}
                {isLoading ? <div>Loading...</div> : <img src={current.picture} style={{ width: "100%", height: "auto" }} />}
                <button onClick={() => next()}>Next</button>
                <button onClick={() => previous()}>Previous</button>
            </div>
            <>
                <h3>All users:</h3>
                {userList.map((user) => {
                    return (<div>
                        <div>{user.name}</div>
                        <img src={user.picture} alt="" />
                    </div>)
                })}
            </>
        </>
    )
}

export default iterator;