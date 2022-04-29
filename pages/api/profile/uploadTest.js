import formidable from 'formidable-serverless'

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
}

const handler = async(req, res) => {
    const { method } = req
    
    switch(method) {
        case 'POST': {
            const form = new formidable.IncomingForm({
                maxFileSize: 20 * 1024 * 1024,
                keepExtensions: true,
                uploadDir: "./uploads"
            })
        
            form.parse(req, (err, fields, files) => {
                let filesArray = []

                Object.entries(files).map(file => {
                    filesArray.push({
                        name: file[0],
                        path: file[1].path
                    })
                })

                console.log(filesArray)

            })

            form.onPart = function(part) {
                if(part.mime === 'image/png' || part.mime === 'image/jpeg') {
                    form.handlePart(part)
                }
            }
        
            form.on('error', (err) => {
                return res.status(200).json({ success: false, error: 'max file size exceeded' })
            })
        }
        default:
            res.status(400).json({ success: false });
        break;
    }
    
}

export default handler