export const protocolTemplate = {
    'protocol': '',
    'types': {
        'letter': {
            'schema': 'letter',
            'dataFormats': [
                'text/plain'
            ]
        }
    },
    'structure': {
        'letter': {
            '$actions': [
                {
                    'who': 'anyone',
                    'can': 'write'
                },
                {
                    'who': 'recipient',
                    'of': 'letter',
                    'can': 'read'
                }
            ]
        }
    }
};