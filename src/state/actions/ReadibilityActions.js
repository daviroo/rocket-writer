export const REFRESH_READIBILITY_STATS = "REFRESH_READIBILITY_STATS";
export function refreshReadibilityStats(payload){
    return {
        type: REFRESH_READIBILITY_STATS,
        payload: payload
    }
}

export const REFRESH_READIBILITY_STATS_SUCCESS = "REFRESH_READIBILITY_STATS_SUCCESS"
export function refreshReadibilityStatsSuccess(){
    return {
        type: REFRESH_READIBILITY_STATS_SUCCESS
    }
}

export const REFRESH_READIBILITY_STATS_FAILED = "REFRESH_READIBILITY_STATS_FAILED";
export function refreshReadibilityStatsFailed(payload){
    return {
        type: REFRESH_READIBILITY_STATS_FAILED,
        payload: payload
    }
}