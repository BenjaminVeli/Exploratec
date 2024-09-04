from django.db import migrations, models

def create_specialties(apps, schema_editor):
    Specialty = apps.get_model('api', 'Specialty')
    specialties = [
        'Electricidad y Electrónica',
        'Gestión y Producción',
        'Mecánica y Aviación',
        'Mecatrónica',
        'Tecnología digital',
        'Minería, Procesos Químicos y Metalúrgicos',
    ]
    
    for name in specialties:
        Specialty.objects.create(name=name)
        
class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'), 
    ]

    operations = [
        migrations.RunPython(create_specialties),
    ]