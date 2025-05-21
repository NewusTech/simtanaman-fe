def sendSlackMessage(message, color = "#36a64f") {
    withCredentials([string(credentialsId: 'SLACK_WEBHOOK_URL', variable: 'SLACK_URL')]) {
        def payload = """
        {
            "attachments": [
                {
                    "color": "${color}",
                    "text": "${message}"
                }
            ]
        }
        """
        sh """curl -X POST -H 'Content-type: application/json' --data '${payload}' '${SLACK_URL}'"""
    }
}

pipeline {
    agent any

    environment {
        NODE_VERSION = "20"
        APP_NAME = "simtanaman.newus.id"
        DEPLOY_PATH = "/home/newus-simtanaman/htdocs/simtanaman.newus.id"
        SOURCE_BRANCH = "main"
        PORT = "3070"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Validate Path') {
            steps {
                script {
                    sh """
                    if [ ! -d "$DEPLOY_PATH" ]; then
                        echo "Error: Directory $DEPLOY_PATH does not exist."
                        exit 1
                    fi
                    """
                }
            }
        }

        stage('Move and Pull') {
            steps {
                dir(DEPLOY_PATH) {
                    script {
                        sh '''
                            git stash
                            git pull origin $SOURCE_BRANCH
                        '''
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir(DEPLOY_PATH){
                    script {
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                            nvm use $NODE_VERSION
                            pnpm install --no-frozen-lockfile
                            pnpm run build
                        '''
                    }
                }
            }
        }
        
        stage('PM2 Restart') {
            steps {
                script {
                    sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
                    whoami
                    pm2 list
                    pm2 restart $APP_NAME || pm2 start npm --name "$APP_NAME" -- start --watch -- --port $PORT
                    pm2 save
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                def source = env.JENKINS_URL ?: 'UNKNOWN_SOURCE'
                def message = "✅ Build SUCCESS:\n*${env.JOB_NAME}* #${env.BUILD_NUMBER}\n🔗 Source: ${source}"
                sendSlackMessage(message, "#2eb886")
            }
        }
        failure {
            script {
                def source = env.JENKINS_URL ?: 'UNKNOWN_SOURCE'
                def message = "❌ Build FAILED:\n*${env.JOB_NAME}* #${env.BUILD_NUMBER}\n🔗 Source: ${source}"
                sendSlackMessage(message, "#ff0000")
            }
        }
    }
}
