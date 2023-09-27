"use client"
import { Modal, TextField, Button } from '@mantine/core';
import { useState } from 'react';

// add an area to select friends to add to the group
// add a button to create the group
// add a button to cancel the group
// you should also be able to look up a specific user and add them to the group
export default function CreateGroup(props: any) {
    const [groupName, setGroupName] = useState('')
    const [groupMembers, setGroupMembers] = useState([])



const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch('http://localhost:3000/api/comms/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-id': session.user.id,
        },
        body: JSON.stringify({
            groupName,
            groupMembers
        })
    })


}


    return (
        <Modal open={props.open}>
            <h1>Create a new group</h1>
            <TextField label="Group Name" onChange={(event) => { setGroupName(event.target.value ) } } />

            <div>
                <Button onClick={handleSubmit}>Create</Button>
                <Button onClick={props.onClose}>Cancel</Button>
            </div>
            

        </Modal>

    )
}