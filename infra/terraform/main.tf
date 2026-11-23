terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# Look up the latest Ubuntu 22.04 image instead of hardcoding an ID
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical's AWS account

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

module "network" {
  source      = "./modules/network"
  project     = var.project
  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

module "security_group" {
  source  = "./modules/security_group"
  project = var.project
  vpc_id  = module.network.vpc_id
  my_ip   = var.my_ip
}

module "compute" {
  source            = "./modules/compute"
  project           = var.project
  ami               = data.aws_ami.ubuntu.id
  key_name          = var.key_name
  subnet_id         = module.network.public_subnet_id
  security_group_id = module.security_group.sg_id
}
