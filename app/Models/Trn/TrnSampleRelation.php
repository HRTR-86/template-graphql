<?php declare(strict_types=1);

namespace App\Models\Trn;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrnSampleRelation extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $table = 'trn_sample_relation';

    protected $fillable = [
        'parent_id',
        'child_id',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    protected array $dates = ['deleted_at'];
}
