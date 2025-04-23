const db = require("../../../db/connection");

export const deleteGoingById = (userId: number, eventId: number) => {
    const deleteQuery = "DELETE FROM user_going WHERE user_id = $1 AND event_id = $2 RETURNING *"
    return db.query(deleteQuery, [userId, eventId])
    .then(({rows}: {rows: {user_id: number, event_id: number}[]}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        if (rows[0].user_id === userId && rows[0].event_id === eventId) {
            return rows[0]
        }
    })
}