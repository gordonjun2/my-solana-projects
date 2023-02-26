import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { StudentIntro } from '../models/StudentIntro'
import * as web3 from '@solana/web3.js'

// from Core-1/3. Custom-Instructions/
// const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf'

// from Core-3/3. Security-and-Validation/
const STUDENT_INTRO_PROGRAM_ID = 'EZhByigTK7sDo72tGVzaWiwbPi3osuvDS9Kwe1A6ujC9'

export const StudentIntroList: FC = () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([])

    useEffect(() => {
        connection.getProgramAccounts(new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID))
        .then(async (accounts) => {
            const intros: StudentIntro[] = accounts.reduce((accum: StudentIntro[], { pubkey, account }) => {
                const intro = StudentIntro.deserialize(account.data)
                if (!intro) {
                    return accum
                }

                return [...accum, intro]
            }, [])
            setStudentIntros(intros)
        })
    }, [])
    
    return (
        <div>
            {
                studentIntros.map((studentIntro, i) => <Card key={i} studentIntro={studentIntro} /> )
            }
        </div>
    )
}