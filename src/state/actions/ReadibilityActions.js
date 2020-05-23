export const REFRESH_READIBILITY_STATS = "REFRESH_READIBILITY_STATS";
export function refreshReadibilityStats(payload){
    return {
        type: REFRESH_READIBILITY_STATS,
        payload: payload
    }
}

export const REFRESH_READIBILITY_STATS_SUCCESS = "REFRESH_READIBILITY_STATS_SUCCESS"
export function refreshReadibilityStatsSuccess(payload){
    return {
        type: REFRESH_READIBILITY_STATS_SUCCESS,
        payload: payload
    }
}

export const REFRESH_READIBILITY_STATS_FAILED = "REFRESH_READIBILITY_STATS_FAILED";
export function refreshReadibilityStatsFailed(payload){
    return {
        type: REFRESH_READIBILITY_STATS_FAILED,
        payload: payload
    }
}

export const UPDATE_CHAR_COUNT = "UPDATE_CHAR_COUNT";
export function updateCharCount(payload){
    return {
        type: UPDATE_CHAR_COUNT,
        payload: payload
    }
}

export const UPDATE_WORD_COUNT = "UPDATE_WORD_COUNT";
export function updateWordrCount(payload){
    return {
        type: UPDATE_WORD_COUNT,
        payload: payload
    }
}

export const UPDATE_SENTENCE_COUNT = "UPDATE_SENTENCE_COUNT";
export function updateSentenceCount(payload){
    return {
        type: UPDATE_SENTENCE_COUNT,
        payload: payload
    }
}

export const UPDATE_PARAGRAPH_COUNT = "UPDATE_PARAGRAPH_COUNT";
export function updateParagraphCount(payload){
    return {
        type: UPDATE_PARAGRAPH_COUNT,
        payload: payload
    }
}

export const RESET_READIBILITY_STATS_STATE = "RESET_READIBILITY_STATS_STATE";
export function resetReadibilityStatsState(){
    return {
        type: RESET_READIBILITY_STATS_STATE
    }
}