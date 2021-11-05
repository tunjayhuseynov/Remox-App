

const AddTeams = () => {

    return <div className="flex flex-col justify-center">
        <div className="grid grid-cols-2">
            <div>Team Name</div>
            <div>
                <input type="text" className="border pl-3" />
            </div>
        </div>
        <div className="grid grid-cols-2">
            <div>Currency to be used</div>
            <div>
                <input type="text" className="border pl-3" />
            </div>
        </div>
    </div>
}

export default AddTeams;