export class UpdateQuestionDTO {
    id?: number
    title?: string | undefined
    description?: string | undefined
    questionerId?: number | undefined
    status?: string | undefined
    categories?: string[] | undefined
}
