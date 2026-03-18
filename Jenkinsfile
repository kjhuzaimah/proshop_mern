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
                    echo ===============================
                    echo SSH using password

                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "mkdir -p ~/Projects/proshop_mern/ali7 && echo DONE"
                    """
                }
            }
        }
    }
}
