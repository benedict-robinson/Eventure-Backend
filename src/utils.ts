export const formatArray = (arr: string[]) => {
    return `{${arr.join(",")}}`
}

export const formatDateAndTimeObj = (obj: any) => {
    return {
      start_date: obj?.start?.localDate || "No Date Provided",
      start_time: obj?.start?.localTime || "No Start Time Provided",
      end_date: obj?.end?.localDate || "No End Date Provided",
      end_time: obj?.end?.localTime || "No End Time Provided",
      timezone: obj?.timezone || "No Timezone Provided"
    }
  }

export const formatImageObj = (obj: any) => {
    return {
      url: obj.url,
      ratio: obj.ratio,
      width: obj.width,
      height: obj.height 
    }
  }

export const sortByDate = (direction: string) => {
  
}