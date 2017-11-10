TO MAKE CODE DEPLOY READY:
1. UNCOMMENT:
    settings.py:line ~16:   #sys.path.insert(0, '/opt/python/current/app')
    wsgi.py:    line ~12:   #import sys
                line ~13:   #sys.path.insert(0, '/opt/python/current/app')
2. CHANGE:
    wsgi.py:    line ~18:   os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.dropZoneHQ.settings.py")
                        TO  os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dropZoneHQ.settings.py")
3. RUN "npm run build" IN React/dropzonehq/
4. MOVE js/ AND css/ FROM React/dropzonehq/build/static
    INTO backend/static
5. MOVE index.html FROM FROM React/dropzonehq/build
    INTO backend/templates
(step 5 is only needed when index.html changes, but do it to be safe.)
6. MOVE ALL OTHER FILES FROM React/dropzonehq/build/
    INTO backend/
(these files will have to be dealt with in the future to be used in production)
7. ZIP CONTENTS OF backend/ (BUT NOT THE OUTER backend FOLDER ITSELF)
    UPLOAD ZIP TO AWS ELASTIC BEANSTALK INSTANCE