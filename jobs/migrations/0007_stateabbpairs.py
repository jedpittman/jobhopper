# Generated by Django 3.1 on 2020-10-07 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("jobs", "0006_blsoesfakes"),
    ]

    operations = [
        migrations.CreateModel(
            name="StateAbbPairs",
            fields=[
                ("state_name", models.CharField(max_length=100)),
                (
                    "abbreviation",
                    models.CharField(max_length=2, primary_key=True, serialize=False),
                ),
            ],
        ),
    ]