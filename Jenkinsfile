pipeline {
  agent any

  stages {
    stage('Clonar o repositório') {
      steps {
        git branch: 'main',
            url: 'https://github.com/leuuh/teste-e2e-ebac-.git'
      }
    }

    stage('Instalar dependências') {
      steps {
        sh 'npm install'
      }
    }

    stage('Executar Testes') {
      steps {
        sh 'NO_COLOR=1 npm run cy:run'
      }
    }
  }
}
