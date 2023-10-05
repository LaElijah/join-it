import avro from 'avsc';

export default avro.Type.forSchema({
    name: 'Message',
    type: 'record',
    fields: [
        {
            name: 'groupId',
            type: 'string'
        },
        {
            name: 'message',
            type: 'string'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'type',
            type: 'string'
        }
    ]
});
