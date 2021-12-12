export interface Collect {
    collectId: number,
    startsDate: string,
    endsDate: string,
    targetAmount: number,
    minDonationAllowed: number,
    suggestedDonation: number,
    totalDonors: number,
    totalRaised: number,
    stillNeeded: number,
    percentageRaised: number,
    remainingDays: number
}
