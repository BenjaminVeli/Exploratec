# Generated by Django 5.1 on 2024-08-27 17:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Specialty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('dni', models.CharField(max_length=9)),
                ('phone', models.CharField(max_length=9)),
                ('reason', models.TextField()),
                ('is_accepted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('specialty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes_especialidad', to='api.specialty')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes_author', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
