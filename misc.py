import os, stat

def remove_dirs(directory):    
    for root, dirs, files in os.walk(directory, topdown = False):
        for file in files:
            filename = os.path.join(root, file)
            os.chmod(filename, stat.S_IWUSR)
            os.remove(filename)
            
        os.chmod(root, stat.S_IWUSR)
        os.rmdir(root)

    
    
