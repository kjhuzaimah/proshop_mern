pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('SSH via Password') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                     bat """
                     plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0" "mkdir -p ~/Projects/proshop_mern/ali7 && echo DONE"
                           """
                }
            }
        }
    }
}
