export class ActivityFormValues {
    id = ''
    title = ''
    category = ''
    description = ''
    date = null
    city = ''
    venue = ''

    constructor(activity) {
        if (activity) {
            this.id = activity.id
            this.title = activity.title
            this.category = activity.category
            this.description = activity.description
            this.date = activity.date
            this.city = activity.city
            this.venue = activity.venue
            
        }
    }
}

export class Activity {
    constructor(init) {
        Object.assign(this, init)
    }
}