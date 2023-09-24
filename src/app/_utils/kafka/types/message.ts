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
            name: 'from',
            type: 'string'
        },
        {
            name: 'to',
            type: 'string'
        },
        {
            name: 'message',
            type: 'string'
        },
        {
            name: 'timestamp',
            type: 'string'
        }
    ]
});
