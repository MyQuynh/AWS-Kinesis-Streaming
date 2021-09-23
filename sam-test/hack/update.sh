#!/bin/bash

'''
This file is used to perform bootstrap action in AWS EMR and install software.
'''
curl -O https://bootstrap.pypa.io/get-pip.py
sudo python3.7 get-pip.py --user
sudo python3.7 -m pip install --upgrade pip
sudo python3.7 -m pip install boto3
sudo python3.7 -m pip install h5py==2.1.0
sudo python3.7 -m pip install pandas
sudo python3.7 -m pip install request
sudo python3.7 -m pip install scipy
sudo python3.7 -m pip install tqdm
sudo python3.7 -m pip install scikit-learn
