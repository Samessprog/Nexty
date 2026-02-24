terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "cognito" {
  source         = "../../modules/cognito"
  user_pool_name = "dev-user-pool"
  client_name    = "dev-app-client"
}
