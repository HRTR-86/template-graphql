<?php declare(strict_types=1);

namespace App\Models\Mst;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MstSampleStatus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mst_sample_status';

    protected $fillable = [
        'name',
        'created_by',
        'updated_by',
    ];

    protected $hidden = [
        'is_unique_target',
    ];
}
