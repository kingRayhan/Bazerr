import Link from 'next/link'
import UpdateItem from '../components/UpdateItem'
const Update = ({ query }) => (
    <div>
        <UpdateItem itemId={query.id} />
    </div>
)

export default Update
